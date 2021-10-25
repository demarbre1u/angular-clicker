CREATE TABLE `monsters` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `hpMax` int(11) NOT NULL,
  `gold` int(11) NOT NULL,
  `src` text NOT NULL,
  `id_zone` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `monsters` (`id`, `name`, `hpMax`, `gold`, `src`, `id_zone`) VALUES
(1, 'Billy the Bat', 10, 2, 'assets/img/monster/bat.svg', 1),
(2, 'Haunted Tree', 20, 5, 'assets/img/monster/tree.svg', 1),
(3, 'Horse Ghost', 40, 12, 'assets/img/monster/horse.svg', 1),
(4, 'Mimic', 80, 50, 'assets/img/monster/mimic.svg', 1),
(5, 'Wild Turbofish', 160, 24, 'assets/img/monster/fish.svg', 2),
(6, 'Sharky Shark', 240, 36, 'assets/img/monster/shark.svg', 2),
(7, 'Mighty Poulpy', 320, 48, 'assets/img/monster/octopus.svg', 2),
(8, 'Whale', 400, 60, 'assets/img/monster/whale.svg', 2),
(9, 'Pirote', 500, 100, 'assets/img/monster/parrot.svg', 3),
(10, 'Sweetie', 600, 140, 'assets/img/monster/heart.svg', 3),
(11, 'John the Cloud', 700, 180, 'assets/img/monster/cloud.svg', 3),
(12, 'Sunny Delight', 800, 220, 'assets/img/monster/sun.svg', 3),
(13, 'Neil', 800, 220, 'assets/img/monster/moon.svg', 3),
(14, 'Spider', 1200, 300, 'assets/img/monster/spider.svg', 4),
(15, 'Ant Eater', 1350, 380, 'assets/img/monster/anteater.svg', 4),
(16, 'Ant', 1500, 460, 'assets/img/monster/ant.svg', 4),
(17, 'Mole', 1650, 540, 'assets/img/monster/mole.svg', 4);

CREATE TABLE `saves` (
  `id` int(11) NOT NULL,
  `gold` int(11) NOT NULL,
  `dmg` int(11) NOT NULL,
  `auto` int(11) NOT NULL,
  `progress` int(11) NOT NULL,
  `weapons` text NOT NULL,
  `id_zone` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `id_save` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `weapons` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `price` int(11) NOT NULL,
  `dmg` int(11) NOT NULL,
  `auto` int(11) NOT NULL,
  `type` int(11) NOT NULL COMMENT '0 : weapon, 1 : magic',
  `src` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `weapons` (`id`, `name`, `price`, `dmg`, `auto`, `type`, `src`) VALUES
(1, 'Wooden Sword', 10, 4, 0, 0, 'assets/img/weapon/wooden_sword.svg'),
(2, 'Iron Sword', 50, 7, 0, 0, 'assets/img/weapon/iron_sword.svg'),
(3, 'Golden Sword', 100, 10, 0, 0, 'assets/img/weapon/golden_sword.svg'),
(4, 'Enchanted Sword', 150, 13, 5, 0, 'assets/img/weapon/magic_sword.svg'),
(5, 'Fire Ball', 200, 0, 10, 1, 'assets/img/weapon/fire.svg'),
(6, 'Holy Nova', 300, 0, 15, 1, 'assets/img/weapon/light.svg'),
(7, 'Water Gun', 200, 0, 10, 1, 'assets/img/weapon/water.svg'),
(8, 'Lightning Bolt', 200, 0, 10, 1, 'assets/img/weapon/thunder.svg'),
(9, 'Poisoned Dagger', 300, 10, 10, 0, 'assets/img/weapon/dagger.svg'),
(10, 'Kunai', 40, 4, 3, 0, 'assets/img/weapon/kunai.svg'),
(11, 'Iron Mace', 350, 25, 0, 0, 'assets/img/weapon/iron-mace.svg'),
(12, 'Holy Shovel', 3000, 100, 0, 0, 'assets/img/weapon/shovel.svg');

CREATE TABLE `zones` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `bg` text NOT NULL,
  `limiter` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `zones` (`id`, `name`, `bg`, `limiter`) VALUES
(1, 'dark', 'assets/img/bg/black.svg', 20),
(2, 'water', 'assets/img/bg/water.svg', 20),
(3, 'sky', 'assets/img/bg/light.svg', 20),
(4, 'underground', 'assets/img/bg/underground.svg', -1);

ALTER TABLE `monsters`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `saves`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

ALTER TABLE `weapons`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `zones`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `monsters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

ALTER TABLE `saves`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

ALTER TABLE `weapons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

ALTER TABLE `zones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
