const Dashboard = (props) => {
    return (
        <div>
            <h1>Dashboard</h1>
            <h3 style={{color: "#333333"}}>Welcome {props.info?.First_Name} to the Dashboard!</h3>
        </div>
    );
};

export default Dashboard;