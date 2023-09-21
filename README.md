
# Car Rental App (CarHub)

This app is created using Angular for frontend and Dotnet WebApi for backend.

## Tools Required

Visual Studio 2022,
Visual Studio Code,

SQL Server Management Studio(SSMS),

Google Chrome / Mozilla Firefox

## Setup 

### Database
    - Extract Car-Backend zip file and configure Connection String , "change the server name to your SSMS server name".
    location: carApp > appsetting.json

    - Perform add-migration and update-database, This will create all the required tables.
      Database Name: CarDbbb.

## How to run the application

1. Database Server and Port Configurations
        Ensure that your SSMS server is configured as follows:
    - Server: `localhost`
    - Port: `7296`

2. Install node-module for Agular file.

3. Ensure angular server and port configuration as follows: 
    - Server: `localhost`
    - Port: `4200`

4. Run (`ng server -o`) in terminal to start angular.

4. Steps to work on Application
    - SignUp into the application.
        - For Admin must SignUp with email:"admin@official.com" and than login.
        -For Regular user you can use any email.
    - LogIn into the application and explore.
    -Once the user will rent car than the email will be sent to the user
    -when the admin return the car than also the email will be sent to user.

## Assumptions

    - Admin will add details of available car only.
    - Admin cannot edit the rented car details.

## Thankyou !!



 


