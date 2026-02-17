const servicesData = {
    haircuts: [
      { name: "Women's haircut", price: "$70-$85" },
      { name: "Men's haircut", price: "$40-$55" },
      {name: "Gender Neutral haircut", price: "$70" },
      { name: "Children's haircut", price: "$30-$40" },
      { name: "Wash & Blow Dry", price: "$45-$55" },
      { name: "Bang Trim", price: "$20" }, 
      { name: "Beard Trim", price: "$20" }
    ],
    colour: [
      { name: "Full Colour", price: "$120" },
      { name: "Highlights", price: "$150" }
    ],
    treatments: [
      { name: "Deep Conditioning", price: "$40" },
      { name: "Keratin Treatment", price: "$200" }
    ],
    extensions: [
      { name: "Wash & Blow Dry with Extensions", price: "$65" },
      { name: "Perm", price: "$180" }
    ],
    beauty: [
      { name: "Makeup", price: "$80" },
      { name: "Eyebrow Shaping", price: "$25" }
    ],
    events: [
      { name: "Bridal Styling", price: "$250" },
      { name: "Formal Updo", price: "$120" }
    ]
  };

  const categoryList = document.getElementById("servicesList");
  const priceContainer = document.getElementById("priceContainer");

  function renderPrices(category) {
    priceContainer.innerHTML = "";

    servicesData[category].forEach(service => {
      const row = document.createElement("div");
      row.classList.add("price-row");

      row.innerHTML = `
        <span>${service.name}</span>
        <span>${service.price}</span>
      `;

      priceContainer.appendChild(row);
    });
  }

  categoryList.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
      document.querySelectorAll("#categoryList li")
        .forEach(li => li.classList.remove("active"));

      e.target.classList.add("active");
      renderPrices(e.target.dataset.category);
    }
  });

  // Load default
  renderPrices("haircuts");