<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Cart</title>

  <!-- BOOTSTRAP -->
  <!-- CSS only -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous" />

  <!-- JS, Popper.js, and jQuery -->
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
  <script>
    $(function() {
      var $select = $(".1-10");
      for (i = 1; i <= 10; i++) {
        $select.append($("<option></option>").val(i).html(i));
      }
    });
  </script>
  <?php
  include('../header/header.html');
  ?>
</head>

<body>
  <div class="d-flex flex-row mt-3">
    <div class="flex-column col-8 ml-3">
      <div class="row col-12 d-flex my-2">
        <h3 class="ml-3">Shopping Cart</h3>
        <div class="ml-auto align-self-end mr-3 p-0">
          <strong>Price</strong>
        </div>
      </div>
      <div class="col-12" style="overflow-y: auto; overflow-x: hidden; height: 90vh">
        <div class="row col-12">
          <div class="card my-2" style="
                max-width: fit-content;
                max-height: 30vh;
                background: #fcfcfc;
              ">
            <div class="d-flex justify-content-between no-gutters">
              <div class="col-md-3">
                <img src="https://source.unsplash.com/200x200/?speaker" style="height: fit-content; width: fit-content" class="card-img p-2" alt="..." />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">
                    JBL Go 2 Portable Waterproof Bluetooth Speaker with mic
                    (Deep Sea Blue)
                  </h5>
                  <p class="card-text" style="height: 10vh; width: 75vw">
                    product description
                  </p>
                  <p class="card-text">
                    <select class="1-10 mx-2" style="height: 4vh"></select>
                    <button class="mx-2 btn btn-outline-dark" href="">
                      Delete
                    </button>
                    <button class="mx-2 btn btn-outline-dark" href="">
                      Save for later
                    </button>
                  </p>
                </div>
              </div>
              <div class="ml-auto mr-3 align-self-center">
                <strong>1,790</strong>
              </div>
            </div>
          </div>
        </div>

        <div class="row col-12">
          <div class="card my-2" style="
                max-width: fit-content;
                max-height: 30vh;
                background: #fcfcfc;
              ">
            <div class="d-flex justify-content-between no-gutters">
              <div class="col-md-3">
                <img src="https://source.unsplash.com/200x200/?speaker" style="height: fit-content; width: fit-content" class="card-img p-2" alt="..." />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">
                    JBL Go 2 Portable Waterproof Bluetooth Speaker with mic
                    (Deep Sea Blue)
                  </h5>
                  <p class="card-text" style="height: 10vh; width: 75vw">
                    product description
                  </p>
                  <p class="card-text">
                    <select class="1-10 mx-2" style="height: 4vh"></select>
                    <button class="mx-2 btn btn-outline-dark" href="">
                      Delete
                    </button>
                    <button class="mx-2 btn btn-outline-dark" href="">
                      Save for later
                    </button>
                  </p>
                </div>
              </div>
              <div class="ml-auto mr-3 align-self-center">
                <strong>1,790</strong>
              </div>
            </div>
          </div>
        </div>
        <div class="row col-12">
          <div class="card my-2" style="
                max-width: fit-content;
                max-height: 30vh;
                background: #fcfcfc;
              ">
            <div class="d-flex justify-content-between no-gutters">
              <div class="col-md-3">
                <img src="https://source.unsplash.com/200x200/?speaker" style="height: fit-content; width: fit-content" class="card-img p-2" alt="..." />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">
                    JBL Go 2 Portable Waterproof Bluetooth Speaker with mic
                    (Deep Sea Blue)
                  </h5>
                  <p class="card-text" style="height: 10vh; width: 75vw">
                    product description
                  </p>
                  <p class="card-text">
                    <select class="1-10 mx-2" style="height: 4vh"></select>
                    <button class="mx-2 btn btn-outline-dark" href="">
                      Delete
                    </button>
                    <button class="mx-2 btn btn-outline-dark" href="">
                      Save for later
                    </button>
                  </p>
                </div>
              </div>
              <div class="ml-auto mr-3 align-self-center">
                <strong>1,790</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-3 ml-auto">
      <div class="card text-center" style="width: 18rem; margin-top: 10vh; background: #fcfcfc">
        <img src="../assets/img/blogo.jpg" style="height: 20vh; width: 18em" alt="" class="p-3" />
        <div class="card-body">
          <h5 class="card-title">Subtotal (1 item): 1,790.00</h5>

          <a href="#" class="btn btn-primary">Buy Now</a>
        </div>
      </div>
    </div>
  </div>
</body>

</html>