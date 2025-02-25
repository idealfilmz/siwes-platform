

CREATE TABLE `logbook` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `establishment` varchar(100) NOT NULL,
  `institution` varchar(100) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `SCORE` int(11) DEFAULT NULL,
  `day` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `logbook`
--

INSERT INTO `logbook` (`id`, `student_id`, `establishment`, `institution`, `address`, `SCORE`, `day`) VALUES
(1, 1, 'john paul', 'samuel-s hostel', 'no 32 taiwo road', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `matric_number` varchar(20) NOT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `fullname` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `course` varchar(100) DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `matric_number`, `phone_number`, `fullname`, `password`, `course`, `department`, `email`) VALUES
(1, '19/25pj048', NULL, 'samuel stephen Opeyemi', '$2a$10$6PA2O3rQ0gDu4phT3UKoNe1PoGFqfSkj/941RM4ftOnHbHGNb6y/O', NULL, NULL, 'samuelyyyy257@gmail.com'),
(5, '16/25pl062', '08146800036', 'sulyman abdulrasaq', '$2a$10$bdmSJvvksq2.64wSLn8lIOYJUXRUfqjzVh1FZX3.VAncGoKQldBP2', 'building tech', 'edu-tech', 'samuel.ss@unilorin.edu.ng');

-- --------------------------------------------------------

--
-- Table structure for table `student_supervisor`
--

CREATE TABLE `student_supervisor` (
  `id` int(11) NOT NULL,
  `std_id` int(11) NOT NULL,
  `supervisor_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_supervisor`
--

INSERT INTO `student_supervisor` (`id`, `std_id`, `supervisor_id`) VALUES
(1, 5, 1),
(2, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `supervisors`
--

CREATE TABLE `supervisors` (
  `PK` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `UQ` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `fullname` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `supervisor_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supervisors`
--

INSERT INTO `supervisors` (`PK`, `id`, `UQ`, `email`, `phone_number`, `fullname`, `password`, `supervisor_id`) VALUES
(1, 0, '', 'samuel.ss@unilorin.edu.ng', '08146800036', 'samuel stephen', '$2a$10$xbWh6NGj2edIYL6tb8GpVOvcMw0U/LKnfITOd5bwnyfVwB/tKa5pu', 89702);

-- --------------------------------------------------------

--
-- Table structure for table `weekly`
--

CREATE TABLE `weekly` (
  `id` int(11) NOT NULL,
  `progress` varchar(255) NOT NULL,
  `logbook_id` int(11) DEFAULT NULL,
  `scores` int(11) DEFAULT NULL,
  `weekly_tract` int(11) DEFAULT NULL,
  `progress_file` char(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `weekly`
--

INSERT INTO `weekly` (`id`, `progress`, `logbook_id`, `scores`, `weekly_tract`, `progress_file`) VALUES
(1, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, vitae corporis aliquid explicabo odit expedita earum illo laudantium nulla numquam repudiandae dolore saepe possimus soluta. Dolor voluptas consequuntur molestiae delectus?', 1, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `logbook`
--
ALTER TABLE `logbook`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `student_id` (`student_id`,`establishment`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `matric_number` (`matric_number`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `student_supervisor`
--
ALTER TABLE `student_supervisor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `supervisors`
--
ALTER TABLE `supervisors`
  ADD PRIMARY KEY (`PK`),
  ADD UNIQUE KEY `UQ` (`UQ`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `weekly`
--
ALTER TABLE `weekly`
  ADD PRIMARY KEY (`id`),
  ADD KEY `logbook_id` (`logbook_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `logbook`
--
ALTER TABLE `logbook`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `supervisors`
--
ALTER TABLE `supervisors`
  MODIFY `PK` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `weekly`
--
ALTER TABLE `weekly`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--