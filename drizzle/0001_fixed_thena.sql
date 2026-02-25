CREATE TABLE `assessments` (
	`id` varchar(36) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`sector` varchar(50) NOT NULL,
	`teamSize` int NOT NULL,
	`roleInProcess` varchar(50) NOT NULL,
	`algorithmVersion` varchar(20) NOT NULL DEFAULT 'aidt_algo_v1.0.0',
	`aiStatus` varchar(20),
	`userAgent` text,
	`locale` varchar(10),
	`referrer` text,
	`status` varchar(20) DEFAULT 'NEW',
	`answers` json,
	CONSTRAINT `assessments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contact_submissions` (
	`id` varchar(36) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`organisation` varchar(255),
	`role` varchar(100),
	`service` varchar(100),
	`teamSize` varchar(20),
	`budget` varchar(20),
	`timeline` varchar(50),
	`message` text NOT NULL,
	`assessmentId` varchar(36),
	`status` varchar(20) DEFAULT 'NEW',
	CONSTRAINT `contact_submissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `diagnostic_results` (
	`id` varchar(36) NOT NULL,
	`assessmentId` varchar(36) NOT NULL,
	`teamPulseScore` decimal(5,2) NOT NULL,
	`healthScore` decimal(5,2) NOT NULL,
	`riskScore` decimal(5,2) NOT NULL,
	`readinessScore` decimal(5,2) NOT NULL,
	`riskLevel` varchar(20) NOT NULL,
	`dimensions` json NOT NULL,
	`topFocusAreas` json NOT NULL,
	`strengths` json,
	`recommendationType` varchar(30) NOT NULL,
	`recommendationConfidence` decimal(5,2) NOT NULL,
	`recommendationScores` json NOT NULL,
	`rationaleBullets` json,
	`expectedOutcomes` json,
	`suggestedModules` json,
	`enrichment` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `diagnostic_results_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lead_signals` (
	`id` varchar(36) NOT NULL,
	`assessmentId` varchar(36) NOT NULL,
	`clsCore` decimal(5,2) NOT NULL,
	`clsFinal` decimal(5,2) NOT NULL,
	`band` varchar(1) NOT NULL,
	`planningStageScore` decimal(5,2) NOT NULL,
	`approvalProcessScore` decimal(5,2) NOT NULL,
	`buyerRoleScore` decimal(5,2) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `lead_signals_id` PRIMARY KEY(`id`)
);
