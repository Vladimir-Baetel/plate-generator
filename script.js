(async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/mgax/dexonline-scrabble/master/words.txt"
  );
  const text = await response.text();
  const words = new Set(text.split("\n"));

  function digitToLetter(digit) {
    const conversion = {
      "1": "I",
      "2": "Z",
      "3": "E",
      "4": "A",
      "5": "S",
      "6": "G",
      "7": "T",
      "0": "O",
    };

    return conversion[digit] || "";
  }

  function isWord(word) {
    return words.has(word);
  }

  function generatePlateNumbers() {
    const counties = ["B", "AB", "AR", "AG", "BC", "BH", "BN", "BR", "BT", "BV", "BZ", "CS", "CL", "CJ", "CT", "CV", "DB", "DJ", "GL", "GR", "GJ", "HR", "HD", "IL", "IS", "IF", "MM", "MH", "MS", "NT", "OT", "PH", "SM", "SJ", "SB", "SV", "TR", "TM", "TL", "VS", "VL", "VN"];

    const validDigits = ["0", "1", "2", "3", "4", "5", "6", "7"];
    const validPlates = {
      twoDigits: [],
      threeDigits: [],
      twoLetterCounty: [],
    };

    for (let county of counties) {
      for (let digit1 of validDigits) {
        for (let digit2 of validDigits) {
          const digitString = digit1 + digit2;
          const partialWord = county + digitString.split("").map(digitToLetter).join("");

          for (let j = 65; j <= 90; j++) {
            for (let k = 65; k <= 90; k++) {
              for (let l = 65; l <= 90; l++) {
                const wordEnd = String.fromCharCode(j) + String.fromCharCode(k) + String.fromCharCode(l);
                const word = partialWord + wordEnd;

                if (isWord(word)) {
                  const plateInfo = { plate: county + " " + digitString + " " + wordEnd, word };
                  if (county === "B" && digitString.length === 2) {
                    validPlates.twoDigits.push(plateInfo);
                  } else if (county.length === 2) {
                    validPlates.twoLetterCounty.push(plateInfo);
                  }
                }
              }
            }
          }
        }
      }
    }

    // Generate B + 3 digits + 3 letters combinations
    for (let digit1 of validDigits) {
      for (let digit2 of validDigits) {
        for (let digit3 of validDigits) {
          const digitString = digit1 + digit2 + digit3;
          const partialWord = "B" + digitString.split("").map(digitToLetter).join("");

          for (let j = 65; j <= 90; j++) {
            for (let k = 65; k <= 90; k++) {
              for (let l = 65; l <= 90; l++) {
                const wordEnd = String.fromCharCode(j) + String.fromCharCode(k) + String.fromCharCode(l);
                const word = partialWord + wordEnd;
  
                if (isWord(word)) {
                  validPlates.threeDigits.push({ plate: "B " + digitString + " " + wordEnd, word });
                }
              }
            }
            }
          }
        }
      }
  
      return validPlates;
    }
  
    function createTable(data) {
      const table = document.createElement("table");
  
      for (const item of data) {
        const row = document.createElement("tr");
  
        const plateCell = document.createElement("td");
        plateCell.innerHTML = `
        <div class="license-plate">
          <div class="country">
            <div class="flag">
              <img src="euro_flag.jpg" />
            </div>
            <div class="initials">RO</div>
          </div>
          <div class="number">
            <span>${item.plate}</span>
          </div>
        </div>
        `;
  
        row.appendChild(plateCell);
  
        const wordCell = document.createElement("td");
        wordCell.textContent = item.word;
        row.appendChild(wordCell);
  
        table.appendChild(row);
      }
  
      return table;
    }
  
    const validPlates = generatePlateNumbers();
    const twoDigitsTable = createTable(validPlates.twoDigits);
    const threeDigitsTable = createTable(validPlates.threeDigits);
    const twoLetterCountyTable = createTable(validPlates.twoLetterCounty);
  
    document.querySelector("#col1").appendChild(twoDigitsTable);
    document.querySelector("#col2").appendChild(threeDigitsTable);
    document.querySelector("#col3").appendChild(twoLetterCountyTable);
  })();
  