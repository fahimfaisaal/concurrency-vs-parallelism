# Concurrency vs Parallelism

## Node commands

```bash
cd node
TASKS=5 node single-thread.mjs # To run 5 cpu intensive tasks
TASKS=5 node single-thread.mjs --io # To run 5 io intensive tasks concurrently
TASKS=5 node multi-thread.mjs # To run 5 cpu intensive tasks in parallel
```

## Go commands

```bash
cd go
TASKS=5 go run main.go # To run 5 cpu intensive tasks
TASKS=5 CPU=2 GO=1 go run main.go # To run 5 cpu intensive tasks concurrently
TASKS=5 CPU=5 GO=1 go run main.go # TO run 5 cpu intensive tasks in parallel
```
