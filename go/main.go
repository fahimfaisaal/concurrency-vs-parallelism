package main

import (
	"fmt"
	"os"
	"runtime"
	"strconv"
	"sync"
	"time"
)

func loop(label string) {
	fmt.Println("Start", label)
	for i := 0; i < 1e11; i++ {
		// Do nothing
	}
	fmt.Println("End", label)
}

// (TASKS / CPUS) * SINGLE_THREAD_TIME = PROCESS_TIME
func main() {
	start := time.Now()
	defer func() {
		fmt.Printf("Took %s\n", time.Since(start))
	}()

	var tasks int

	if tasksStr := os.Getenv("TASKS"); tasksStr != "" {
		tasks, _ = strconv.Atoi(tasksStr)
	} else {
		tasks = 1
	}

	if cpus := os.Getenv("CPUS"); cpus != "" {
		cpusNum, _ := strconv.Atoi(cpus)
		runtime.GOMAXPROCS(cpusNum)
	}

	if os.Getenv("GO") != "1" {
		// without go routine
		for i := range tasks {
			loop("Task: " + strconv.Itoa(i+1))
		}
	} else {
		fmt.Println("Go routine enabled")
		// with go routine
		wg := new(sync.WaitGroup)

		wg.Add(tasks)
		for i := range tasks {
			go func() {
				loop("Task: " + strconv.Itoa(i+1))
				wg.Done()
			}()
		}
		wg.Wait()
	}
}
