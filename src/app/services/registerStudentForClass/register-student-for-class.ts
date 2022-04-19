export interface RegisterStudentForClass {
    function: string;
	studentId: number;
	courseId: number;
}

export interface IsStudentRegisteredForClass {
    function: string;
	studentId: number;
	courseId: number;
}

export interface AllAvailabaleClasses {
	function: string
}

export interface ListOfCurrentClasses {
	function: string;
	studentId: number;
}

export interface ActualAndTotalPossibleScores {
	function: string;
	studentId: number;
	courseId: number;
}

export interface CompletedAndTotalModules {
	function: string;
	studentId: number;
	courseId: number;
}

export interface Video {
	function: string;
	segmentId: number;
	courseId: number;
}

export interface NextSegment {
	function: string;
	studentId: number;
	courseId: number;
}