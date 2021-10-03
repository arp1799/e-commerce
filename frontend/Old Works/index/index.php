<!DOCTYPE html>
<html lang="en">

<head>
        <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Home</title>
</head>

<body>
        <div> <?php
                include('../header/header.php');
                ?>
        </div>
        <div> <?php
                include('../homepage/slider.html');
                ?>
        </div>


        <div class="mt-5"> <?php
                                include('../homepage/todays_deal.html');
                                ?>
        </div>

        <div class="mt-2"> <?php
                                include('../homepage/BundledProducts.html');
                                ?>
        </div>
        <div class="mt-2"> <?php
                                include('../homepage/LatestProducts.html.html');
                                ?>
        </div>


        <div> <?php
                include('../footer/footer.html');
                ?>
        </div>
</body>