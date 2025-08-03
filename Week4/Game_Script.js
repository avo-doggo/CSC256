function displayInfo()
{
    //Get input information
    const name = document.getElementById("playerName").value;
    const weapon = document.getElementById("playerWeapon").value;
    const health = document.getElementById("playerHealth").value;
    const points = document.getElementById("pointTotal").value;
    
    //remove class with inputs and button
   const container = document.querySelector(".playerInfo");
    container.remove(); 
    
    //Output the information
    document.getElementById("nameOutput").textContent = "Name: " + name;
    document.getElementById("weaponOutput").textContent = "Weapon: " + weapon;
    document.getElementById("healthOutput").textContent = "HP: " + health;
    document.getElementById("pointOutput").textContent = "Points: " + points;
    
    // Show the output classes
    document.querySelector(".outputLeft").style.display = "block";
    document.querySelector(".outputRight").style.display = "block";
}