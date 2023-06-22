import React from "react";

//footer component

const Footer = () => {
  return (
    <div>
      <footer class="footer">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-6">2022 &copy; Copyright.</div>
            <div class="col-sm-6">
              <div class="text-sm-right d-none d-sm-block">
                Support Email:
                <a href="#" target="_blank" class="text-muted">
                  support@velsof.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
