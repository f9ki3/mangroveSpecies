$(document).ready(function () {
  let sort_column = $("#sortBySelect").val();
  let sort_direction = $("#arrangeBySelect").val();
  let searchTerm = "";

  function loadData(page = 1) {
    const url = `/readSpeciesDetected?page=${page}&per_page=12&sort_column=${sort_column}&sort_direction=${sort_direction}&search=${encodeURIComponent(
      searchTerm
    )}`;
    console.log("Fetching data from:", url);

    $.ajax({
      url: url,
      type: "GET",
      dataType: "json",
      success: function (response) {
        renderData(response.data);
        updatePagination(response.current_page, response.total_pages);
      },
      error: function (xhr, status, error) {
        console.error("Error fetching data:", error);
      },
    });
  }

  function renderData(data) {
    $("#data-items").empty();

    if (data.length === 0) {
      $("#data-items").append(`
        <div class="col-12 d-flex flex-column justify-content-center align-items-center border mt-4 m-2 rounded" style="height: 60vh">
          <i class="bi bi-search text-muted" style="font-size: 2rem;"></i>
          <p class="text-muted mt-2">No results found.</p>
        </div>
      `);
      return;
    }

    data.forEach((item) => {
      // Determine the background and text color based on species status
      let statusStyle =
        item.species_status === "Detected"
          ? "background-color: rgb(148, 230, 148); color: green; border: 2px solid green;"
          : "background-color: rgb(255, 204, 204); color: red; border: 2px solid red;";

          $("#data-items").append(`
            <div class="col-12 col-md-4 mb-3">
              <a href="/view_detected?filename=${encodeURIComponent(item.species_filename)}" class="text-decoration-none text-dark">
                <div class="d-flex flex-row align-items-start item-card border rounded-4 p-2" style="transition: 0.2s ease-in-out;">
                  <div style="width: 100px; height: 100px">
                    <img class="rounded-4" style="object-fit: cover; width: 100%; height: 100%" 
                         src="../../static/uploads/${item.species_filename}" 
                         alt="${item.species_predicted}" />
                  </div>
                  <div class="ms-3">
                    <p class="text-muted mt-1" style="font-size: 13px; margin: 0px">FILENAME: ${item.species_filename}</p>
                    <p class="text-muted mt-1" style="font-size: 13px; margin: 0px">CLASS: ${item.species_predicted}</p>
                    <p class="text-muted mt-1" style="font-size: 13px; margin: 0px">
                      STATUS: <span class="rounded-4 fw-bolder" style="padding: 5px; ${statusStyle}">
                        ${item.species_status}
                      </span>
                    </p>
                  </div>
                </div>
              </a>
            </div>
          `);
          
          
          
    });
  }

  function updatePagination(currentPage, totalPages) {
    const pagination = $("#pagination-container .pagination").empty();
    pagination.append(
      `<li class="page-item ${
        currentPage === 1 ? "disabled" : ""
      }"><a class="page-link" href="#" data-page="${
        currentPage - 1
      }">Previous</a></li>`
    );
    for (
      let i = Math.max(1, currentPage - 2);
      i <= Math.min(totalPages, currentPage + 2);
      i++
    ) {
      pagination.append(
        `<li class="page-item ${
          i === currentPage ? "active" : ""
        }"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`
      );
    }
    pagination.append(
      `<li class="page-item ${
        currentPage === totalPages ? "disabled" : ""
      }"><a class="page-link" href="#" data-page="${
        currentPage + 1
      }">Next</a></li>`
    );
    $("#page-info").text(`Page ${currentPage} of ${totalPages}`);
  }

  $("#arrangeBySelect, #sortBySelect").change(function () {
    sort_column = $("#sortBySelect").val();
    sort_direction = $("#arrangeBySelect").val();
    loadData();
  });

  $(document).on("click", ".page-link", function (e) {
    e.preventDefault();
    const page = $(this).data("page");
    if (page) loadData(page);
  });

  $("#searchButton").click(function () {
    searchTerm = $("#searchInput").val().trim();
    loadData();
  });

  $("#searchInput").keypress(function (e) {
    if (e.which === 13) {
      searchTerm = $(this).val().trim();
      loadData();
    }
  });

  loadData();
});
