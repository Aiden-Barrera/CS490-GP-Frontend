//do npm run dev
const express = require("express"); 
const mysql = require("mysql2");
const app = express(); //initialize express
const bodyParser = require("body-parser");
const cors = require("cors");
const corsOptions = {
    origin: ["http://localhost:5173"], //port that Vite runs on
}

app.use(cors(corsOptions));
app.use(express.json()); // ✅ Parses JSON body
app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded data

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: 'December122700@',
    database: "sakila"
})


//Gets Top 5 movies and their description
app.get("/movie", (req, res) => {
    const sql = `
    SELECT f.film_id, f.title, f.description, 
       c.name AS category_name,
       COUNT(r.rental_id) AS rental_count 
    FROM film f 
    JOIN film_actor fa ON f.film_id = fa.film_id 
    JOIN inventory i ON f.film_id = i.film_id 
    JOIN rental r ON i.inventory_id = r.inventory_id 
    JOIN film_category fc ON f.film_id = fc.film_id
    JOIN category c ON fc.category_id = c.category_id
    GROUP BY f.film_id, f.title, f.description, c.name 
    ORDER BY rental_count DESC 
    LIMIT 5;`;
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
        })
    })

    //Gets Top 5 actors and their top 5 movies
    app.get("/actors", (req, res) => {
        const sql = `
WITH ActorRentalCounts AS (
    -- Calculate total rentals per actor
    SELECT 
        a.actor_id, 
        a.first_name, 
        a.last_name, 
        COUNT(r.rental_id) AS total_rentals
    FROM actor a
    JOIN film_actor fa ON a.actor_id = fa.actor_id
    JOIN inventory i ON fa.film_id = i.film_id
    JOIN rental r ON i.inventory_id = r.inventory_id
    GROUP BY a.actor_id, a.first_name, a.last_name
), 
TopActors AS (
    -- Rank actors by total rental count and get the top 5
    SELECT 
        actor_id, 
        first_name, 
        last_name, 
        total_rentals,
        ROW_NUMBER() OVER (ORDER BY total_rentals DESC) AS actor_rank
    FROM ActorRentalCounts
    WHERE total_rentals > 0
    LIMIT 5
), 
RankedFilms AS (
    -- Rank films per actor based on rental count
    SELECT 
        ta.actor_id, 
        ta.first_name, 
        ta.last_name, 
        f.film_id, 
        f.title, 
        COUNT(r.rental_id) AS rental_count,
        ROW_NUMBER() OVER (PARTITION BY ta.actor_id ORDER BY COUNT(r.rental_id) DESC) AS film_rank
    FROM TopActors ta
    JOIN film_actor fa ON ta.actor_id = fa.actor_id
    JOIN film f ON fa.film_id = f.film_id
    JOIN inventory i ON f.film_id = i.film_id
    JOIN rental r ON i.inventory_id = r.inventory_id
    GROUP BY ta.actor_id, ta.first_name, ta.last_name, f.film_id, f.title
) 
-- Select only the top 5 movies for each of the top 5 actors
SELECT first_name, last_name, title, rental_count 
FROM RankedFilms 
WHERE film_rank <= 5
ORDER BY actor_id, film_rank;
        `;
    
        db.query(sql, (err, data) => {
            if (err) return res.status(500).json({ error: err.message });
            return res.json(data);
        });
    });

//Get customer info/ create new customer
app.get("/customers", (req, res) => {
    db.query(`SELECT * FROM customer`, 
        (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  });
  
  // Add a new customer
  app.post("/customers", (req, res) => {
    console.log("Received request body:", req.body); // ✅ Check if data is received
    const { first_name, last_name, email, store_id} = req.body;
    if (!first_name || !last_name || !email || !store_id) {
      return res.status(400).json({ error: "All fields are required" });
    }
    console.log("Passed through customer add");
    
    const defaultAddressId=1;
    db.query(
      `INSERT INTO customer (first_name, last_name, email, store_id, address_id) VALUES (?, ?, ?, ?, ?)`,
      [first_name, last_name, email, store_id, defaultAddressId],
      (err, result) => {
        if (err){
        console.error("Database error:", err);
        return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Customer added successfully", id: result.insertId });
      }
    );
    });

    app.delete("/customers/:id", (req, res) => {
        const { id } = req.params;
        
        db.query(`DELETE FROM customer WHERE customer_id = ?`, [id], (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: err.message });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Customer not found" });
            }
            res.status(200).json({ message: "Customer deleted successfully" });
        });
    });
/*
app.get("/api", (req, res) => { //Create enrty point at route /api
    res.json({fruits: ["apple", "orange", "banana"]});
});
*/
app.listen(8080, () => console.log("Listening on port 8080")); //app.listen will access server at port 8080
                                                               //listen to requests sent to app
