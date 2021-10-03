<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0, width=device-width" />
  <title>Signin</title>

  <!--===============
          CSS 
     ================-->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous" />

  <link href="../assets/css/registration/fonts.css" rel="stylesheet" />
  <link href="css/fontawesome-all.min.css" rel="stylesheet" />
  <link href="../assets/css/registration.css" rel="stylesheet" />
</head>
<?php
include('../header/header.php');
?>

<body>
  <div class="head" style="margin-top: 10vh">

    <h1>Welcome to Global Nostalgia</h1>
  </div>
  <div class="Signin">
    <h4>SIGN IN</h4>
    <p>Not A Member Yet?<a href="Customer.php">Sign Up Now!!</a></p>
  </div>
  <div class="main">
    <form>
      <input type="email" name="E-mail" placeholder="E-mail" required />
      <input type="password" name="Password" placeholder="Password" required />
      <p><a href="forgetpassword.php">FORGET YOUR PASSWORD?</a></p>
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