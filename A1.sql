/*1. Display film id, title, and film category name*/
SELECT f.film_id, f.title, c.name AS category_name
FROM film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c ON fc.category_id = c.category_id;

/*2. Display film count by category name. ex. Action 64, Animation 66, etc..*/
SELECT c.name AS c_name, COUNT(f.film_id) AS f_count
FROM film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c ON fc.category_id = c.category_id
GROUP BY c.name;

/*3. Display the number of films an actor is part of in order where actors that have done most films first.*/
SELECT a.actor_id, a.first_name, a.last_name, COUNT(fa.film_id) AS movies
FROM actor a
JOIN film_actor fa ON a.actor_id = fa.actor_id
GROUP BY a.actor_id, a.first_name, a.last_name
ORDER BY movies DESC;

/*4. Find how many copies of a certain film a store has*/
SELECT i.store_id, i.film_id, COUNT(i.inventory_id) AS DVD
FROM inventory i
GROUP BY i.store_id, i.film_id
ORDER BY i.store_id, i.film_id;

/*5. Display list of all dvds that are rented out.*/
SELECT r.rental_id, f.film_id, r.rental_date, i.inventory_id, staff_id
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
JOIN customer c ON r.customer_id = c.customer_id
WHERE r.return_date IS NULL;

/*6. Display film id, title, category and rental count of the top 5 rented films*/
SELECT f.title, COUNT(r.rental_id) AS rented
FROM film f
JOIN inventory i ON f.film_id = i.film_id
JOIN rental r ON i.inventory_id = r.inventory_id
GROUP BY f.title
ORDER BY rented DESC
LIMIT 5;

/*7. Display film id, title, rental count of the top 5 rented movies of the actor who has done the most films.*/
SELECT f.film_id, f.title, COUNT(r.rental_id) AS rental_count
FROM film f
JOIN film_actor fa ON f.film_id = fa.film_id
JOIN inventory i ON f.film_id = i.film_id
JOIN rental r ON i.inventory_id = r.inventory_id
WHERE fa.actor_id = 107  
GROUP BY f.film_id, f.title
ORDER BY rental_count DESC
LIMIT 5;


/*8. How many dvds has a customer rented? Display their first name, last name along with rental count*/
SELECT r.customer_id, c.first_name, c.last_name, COUNT(r.rental_id) AS count
FROM customer c
JOIN rental r ON c.customer_id = r.customer_id
GROUP BY c.customer_id, c.first_name, c.last_name