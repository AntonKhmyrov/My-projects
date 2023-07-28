// Представьте, что вы разрабатываете игру в жанре RPG.Вам необходимо реализовать классы для персонажей и их способностей.Вот требования к классам:

// Класс "Персонаж"(Character):
// Свойства:
// "name" для хранения имени персонажа.
// "level" для хранения уровня персонажа.
// "health" для хранения текущего здоровья персонажа.
//    Методы:
// "attack(target)" для атаки другого персонажа.
// "heal(ally)" для восстановления здоровья союзного персонажа.
//???//
//    Класс "Способность"(Ability):
// Свойства:
// "name" для хранения имени способности.
// "power" для хранения силы способности.
//    Методы:
// "use(user, target)" для использования способности персонажем на цель.
//???//
//    Класс "Маг"(Wizard), наследуется от класса "Персонаж"(Character):
// Добавляет свойство "mana" для хранения текущего запаса маны персонажа.
// Добавляет метод "castSpell(target)" для использования магией на цель.
// Имеет доступ к набору способностей, представленных экземплярами класса "Способность"(Ability).

//    Класс "Воин"(Warrior), наследуется от класса "Персонаж"(Character):
// Добавляет свойство "strength" для хранения силы воина.
// Добавляет метод "useAbility(ability, target)" для использования способности воином на цель.
// Имеет доступ к набору способностей, представленных экземплярами класса "Способность"(Ability).

//???//
// Ваша задача:
// Реализовать классы "Персонаж"(Character), "Способность"(Ability), "Маг"(Wizard) и "Воин"(Warrior) в соответствии с описанными требованиями.
// Создать несколько экземпляров магов, воинов и способностей.
// Продемонстрировать использование методов и проверить их работу.
//???//
// Класс "Монстр"(Monster), наследуется от класса "Персонаж"(Character):
// Добавляет свойство "experience" для хранения опыта, получаемого за убийство монстра.
// Добавляет метод "dropLoot()" для получения случайного предмета от монстра.
//    Класс "Предмет"(Item):

// Свойства:
// "name" для хранения имени предмета.
// "power" для хранения силы предмета.
//    Класс "Игрок"(Player), наследуется от класса "Маг"(Wizard) и "Воин"(Warrior):

// Добавляет свойство "experience" для хранения опыта игрока.
// Добавляет метод "gainExperience(amount)" для получения опыта игроком.
// Добавляет метод "levelUp()" для повышения уровня игрока.




class Character {
   constructor(name, level = 1, health) {
      this.name = name
      this.level = level
      this.health = health
   }
   attack(target) {
      console.log(`${this.name} attack ${target.name}`);
      target.health -= 20
   }
   heal(ally) {
      console.log(`${this.name} heal ${ally.name}`);
      ally.health += 15
   }
}

class Ability {
   constructor(name, power,) {
      this.name = name
      this.power = power
   }
   use(user, target) {
      console.log(`${user.name} use ${this.name} on ${target.name}`);
   }
}

class Wizard extends Character {
   constructor(name, level = 1, health, mana = 100) {
      super(name, level = 1, health)
      this.mana = mana
      this.abilities = [
         new Ability('Fireball', 50),
         new Ability('Frost', 40),
         new Ability('Heal', 30)
      ]
   }
   castSpell(target) {
      const ability = this.abilities[Math.floor(Math.random() * this.abilities.length)]
      ability.use(this, target)
      this.mana -= ability.power
      target.health -= ability.power
   }
}

class Warrior extends Character {
   constructor(name, level = 1, health, strength = 60) {
      super(name, level = 1, health)
      this.strength = strength
   }
   useAbility(ability, target) {
      ability.use(this, target)
      this.strength -= ability.power
      target.health -= ability.power
   }
}

class Monster extends Character {
   constructor(name, level = 1, health, experience = 100) {
      super(name, level = 1, health)
      this.experience = experience
   }
   dropLoot() {
      const loot = new Item('Sword', 40)
      console.log(`При убийстве ${this.name} выпал ${loot.name}`);
      return loot
   }
}

class Item {
   constructor(name, power) {
      this.name = name
      this.power = power
   }
}

class Player extends Warrior {
   constructor(name, level = 1, health, strength = 60, experience = 0) {
      super(name, level = 1, health, strength = 60)
      this.experience = experience
   }
   gainExperience(amount) {

   }
   levelUp() {
      if (this.experience > 100) {
         this.level++
         console.log(`${this.name} повысил уроевень до ${this.level}-го`);
      }
   }
}

// character
const wizard = new Wizard('Sasha', 1, 100);
const warrior = new Warrior('Nikita', 1, 100);
const monster = new Monster('Monster', 1, 250);
// ability
const bush = new Ability('Bush', 100);


// wizard.attack(monster);
// warrior.attack(monster);
// console.log(monster.health);
// monster.heal(monster);
// console.log(monster.health);
// monster.attack(warrior);
// wizard.heal(warrior);
// console.log(warrior.health);


wizard.castSpell(warrior);
console.log(warrior.health);
warrior.useAbility(bush, wizard);
console.log(wizard.health);