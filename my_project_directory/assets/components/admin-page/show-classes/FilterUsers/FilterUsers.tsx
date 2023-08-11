import React from "react";
import "./FilterUsers.css";

function FilterUsers() {
    return (
      <>
          <div className="filter-clases">
              <form action="">
                  <div className="filter-selector">
                      <label htmlFor="city">City: </label>
                      <select id="city" name="city">
                          <option value=""></option>
                          <option value="Arad">Arad</option>
                          <option value="Bucuresti">Bucuresti</option>
                          <option value="Cluj">Cluj</option>
                          <option value="Deva">Deva</option>
                      </select>
                  </div>

                  <div className="filter-selector">
                      <label htmlFor="school">School: </label>
                      <select id="school" name="school">
                          <option value=""></option>
                          <option value="volvo">Volvo</option>
                          <option value="saab">Saab</option>
                          <option value="fiat">Fiat</option>
                          <option value="audi">Audi</option>
                      </select>
                  </div>

                  <div className="filter-selector">
                      <label htmlFor="class">Class: </label>
                      <select id="class" name="class">
                          <option value=""></option>
                          <option value="volvo">8A</option>
                          <option value="saab">8B</option>
                          <option value="fiat">8C</option>
                          <option value="audi">12A</option>
                          <option value="audi">12B</option>
                          <option value="audi">12C</option>
                      </select>
                  </div>
                  <div className="filter-input">
                      <input type="submit" />
                  </div>
              </form>
          </div>
      </>
    );
}

export default FilterUsers;