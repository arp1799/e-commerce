<!DOCTYPE html>
<html lang="en">

<head>
    <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div>
        <?php

        include('layer_one.html');
        ?>
    </div>
    <div style="margin-top:1vh; ">
        <?php
        include('layer_two.html');
        ?>
    </div>
    <div style="background:#fff; max-height:5vh">
        <?php
        include('navbar.html');
        ?>
    </div>


</body>

</html>