<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta
      name="viewport"
      content="initial-scale=1.0, minimum-scale=1.0, width=device-width"
    />
    <title>Signin</title>
    <!--===============
          CSS 
     ================-->
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
      integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
      crossorigin="anonymous"
    />

    <link href="../assets/css/registration/fonts.css" rel="stylesheet" />
    <link href="css/fontawesome-all.min.css" rel="stylesheet" />
    <link href="../assets/css/registration.css" rel="stylesheet" />
  </head>

  <body>
    <div class="head" style="margin-top: 10vh">
      <div class="logo text-center"><img src="../assets/img/logo.png" /></div>
    </div>
    <div class="Signin">
      <h4>Recover Password</h4>
      <p>Not A Member Yet?<a href="Customer.php">Sign Up Now!!</a></p>
    </div>
    <div class="main">
      <form>
        <input type="email" name="E-mail" placeholder="E-mail" required />

        <p><a href="sign_in.php">Want to signin?</a></p>
        <button class="btn">Submit</button>
      </form>
    </div>
  </body>
  <footer>
    <?php
        include('../footer/footer.html');
        ?>
  </footer>
</html>
