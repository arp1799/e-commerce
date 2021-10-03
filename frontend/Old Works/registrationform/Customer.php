<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0, width=device-width" />
  <title>Customer Registration Form</title>

  <!--===============
          CSS 
        ===============-->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous" />
  <link href="../assets/css/registration/fonts.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous" />
  <link href="../assets/css/registration.css" rel="stylesheet" />
</head>
<?php
include('../header/header.php');
?>

<body>
  <div class="head" style="margin-top: vh">
    <br />
    <h1>Welcome to Global Nostalgia</h1>
  </div>
  <div class="Customer">
    <h5>CUSTOMER REGISTRATION</h5>
    <p>
      Already A Member? Click To <a href="sign_in.php">Login! As Customer</a>
    </p>
  </div>
  <div class="main">
    <form>
      <input type="text" name="fname" placeholder="First name" required />
      <input type="text" name="Lname" placeholder="Last name" required />
      <input type="password" name="Password" placeholder="Password" required />
      <input type="password" name="Confirm password" placeholder="Confirm password" required />
      <input type="email" name="E-mail" placeholder="E-mail" required />
      <input type="text" name="Contact No." placeholder="Contact No." required />
      <button class="btn btn-outline-dark">Submit</button>
    </form>
  </div>
</body>
<footer>
  <?php
  include('../footer/footer.html');
  ?>
</footer>

</html>