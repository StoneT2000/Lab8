describe('Party Horn Tests', () => {
  const url = "http://127.0.0.1:5500";
  beforeEach(() => {
    cy.visit(url);
  });

  it('Should set volume through typed input', () => {
    let volumeBox = cy.get('#volume-number');
    volumeBox.clear().type('75').then(($el) => {
      expect($el).to.have.value(75)
    });
  });
  it('Should set volume through slider', () => {
    let volumeSlider = cy.get('#volume-slider');
    volumeSlider.invoke('val', 33).trigger('input').then(($el) => {
      cy.get('#volume-number').then(($el) => {
        expect($el).to.have.value(33);
      })
    });
  });
  it('Should set audio volume through slider', () => {
    let volumeSlider = cy.get('#volume-slider');
    volumeSlider.invoke('val', 33).trigger('input');
    cy.get('#horn-sound').then(($el) => {
      expect($el).to.have.prop("volume", 0.33);
    })
  });
  it('Should change change image and sound sources when party horn option is selected', () => {
    cy.get("#radio-party-horn").check();
    cy.get("#horn-sound").then(($el) => {
      expect($el).to.have.prop("src", url + "/assets/media/audio/party-horn.mp3")
    });
    cy.get("#sound-image").then(($el) => {
      expect($el).to.have.prop("src", url + "/assets/media/images/party-horn.svg")
    });
  });
  describe("Test volume icon changes appropriately", () => {
    it("Should set to 3 bar volume icon for volume > 66", () => {
      let volumeBox = cy.get('#volume-number');

      // set to 0 first to check if it'll switch back since default is level 3 anyway
      volumeBox.clear().type('0');

      volumeBox.clear().type('67');
      cy.get("#volume-image").then(($el) => {
        expect($el).to.have.prop("src", url + "/assets/media/icons/volume-level-3.svg")
      });
    });
    it("Should set to 2 bar volume icon for 67 > volume > 33 ", () => {
      let volumeBox = cy.get('#volume-number');
      volumeBox.clear().type('34');
      cy.get("#volume-image").then(($el) => {
        expect($el).to.have.prop("src", url + "/assets/media/icons/volume-level-2.svg")
      });
      volumeBox = cy.get('#volume-number');
      volumeBox.clear().type('66');
      cy.get("#volume-image").then(($el) => {
        expect($el).to.have.prop("src", url + "/assets/media/icons/volume-level-2.svg")
      });
    });
    it("Should set to 1 bar volume icon for 34 > volume > 0 ", () => {
      let volumeBox = cy.get('#volume-number');
      volumeBox.clear().type('1');
      cy.get("#volume-image").then(($el) => {
        expect($el).to.have.prop("src", url + "/assets/media/icons/volume-level-1.svg")
      });
      volumeBox = cy.get('#volume-number');
      volumeBox.clear().type('33');
      cy.get("#volume-image").then(($el) => {
        expect($el).to.have.prop("src", url + "/assets/media/icons/volume-level-1.svg")
      });
    });
    it("Should set to 0 bar volume icon for volume == 0 ", () => {
      let volumeBox = cy.get('#volume-number');
      volumeBox.clear().type('0');
      cy.get("#volume-image").then(($el) => {
        expect($el).to.have.prop("src", url + "/assets/media/icons/volume-level-0.svg")
      });
    });
  });
  describe("Test disabling honk button", () => {
    it("should disable the button when there is no volume input", () => {
      let volumeBox = cy.get('#volume-number');
      volumeBox.clear();
      cy.get("#honk-btn").then(($el) => {
        expect($el).to.have.attr("disabled");
      });
    });
    it("should disable the button when volume is 0", () => {
      let volumeBox = cy.get('#volume-number');
      volumeBox.clear().type("0");
      cy.get("#honk-btn").then(($el) => {
        expect($el).to.have.attr("disabled");
      });
    });
    it("should disable the button when volume is not a number", () => {
      let volumeBox = cy.get('#volume-number');
      volumeBox.clear().type("a");
      cy.get("#honk-btn").then(($el) => {
        expect($el).to.have.attr("disabled");
      });
    });
  });
  it("should show an error when a number outside the 0-100 range of the volume box is entered", () => {
    let volumeBox = cy.get('#volume-number');
    volumeBox.clear().type("999");
    cy.get("input:invalid").should("have.length", 1);
  });
});
