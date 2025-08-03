function displayInfo()
{
    const name = document.getElementById("playerName").value;
    const weapon = document.getElementById("playerWeapon").value;
    const health = document.getElementById("playerHealth").value;
    const points = document.getElementById("pointTotal").value;

    document.getElementById("nameOutput").textContent = "Name: " + name;
    document.getElementById("weaponOutput").textContent = "Weapon: " + weapon;
    document.getElementById("healthOutput").textContent = "HP: " + health;
    document.getElementById("pointOutput").textContent = "Points: " + points;

   const container = document.querySelector(".playerInfo");
    container.remove();

    // Show the HUD panels
    document.querySelector(".outputLeft").style.display = "block";
    document.querySelector(".outputRight").style.display = "block";
}