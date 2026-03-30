# GraphQL + React Demo Application

A React + TypeScript demo application that showcases GraphQL integration using the public [Rick and Morty API](https://rickandmortyapi.com/graphql), combined with drag-and-drop task management and utility algorithm implementations.

## Features

- **Character Browser** — Fetches and displays a list of Rick and Morty characters using GraphQL queries. Click any character to load and display their image via a secondary query.
- **Character Search** — Real-time character search using `useLazyQuery`. Queries the API as you type and displays the matching characters' locations.
- **Post Creation** — Demonstrates a GraphQL mutation hook by creating a post against the [JSONPlaceholder](https://jsonplaceholder.typicode.com) REST API.
- **Drag-and-Drop Task Manager** — Two independent task lists that support adding tasks, reordering within a list, and moving tasks between lists via drag-and-drop (powered by `@dnd-kit`).
- **Utility Functions** — A set of common algorithm implementations (merge sorted arrays, remove duplicates, majority element, rotate array, etc.).

## Tech Stack

| Layer | Technology |
|---|---|
| UI | [React 19](https://react.dev/) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| Build tool | [Vite](https://vitejs.dev/) |
| GraphQL client | [Apollo Client 4](https://www.apollographql.com/docs/react/) |
| Drag-and-drop | [@dnd-kit](https://dndkit.com/) |
| Code generation | [@graphql-codegen](https://the-guild.dev/graphql/codegen) |
| Linting | [ESLint](https://eslint.org/) |

## Project Structure

```
src/
├── main.tsx                    # App entry point — wraps app in ApolloProvider
├── App.tsx                     # Root component (Character Browser + Search + Drag-Drop)
├── apolloClient.ts             # Apollo Client configured for Rick and Morty GraphQL API
├── components/
│   ├── CreatePost.tsx          # Mutation demo — creates a post via GraphQL mutation
│   ├── CustomSearch.tsx        # Character search using useLazyQuery
│   ├── DragAndDrop.tsx         # Drag-and-drop container
│   ├── DroppableList.tsx       # Droppable list with add-task input
│   └── SortableItem.tsx        # Individual draggable task item
├── hooks/
│   ├── useGetCharacterList.ts  # useQuery hook — fetches all characters
│   ├── useGetCharacterDetails.ts # useQuery hook — fetches a single character by ID
│   ├── usePostCreatePostMutation.ts # useMutation hook — creates a post
│   └── useDragAndDrop.ts       # Manages drag-drop state across two lists
├── types/
│   └── task.ts                 # Task interface { id, content }
└── utils/
    ├── mergeSortedArray.ts
    ├── removeDuplicateElements.ts
    ├── majorityElement.ts
    ├── rotateByK.ts
    ├── lengthOfLastWord.ts
    └── firstOccuranceOfString.ts
```

## Architecture Overview

```
┌──────────────────────────────────────────────────┐
│                  ApolloProvider                  │
│         (Rick and Morty GraphQL API)             │
│         https://rickandmortyapi.com/graphql      │
└───────────────────────┬──────────────────────────┘
                        │
          ┌─────────────┴─────────────┐
          │      Custom Hooks         │
          │  useGetCharacterList      │
          │  useGetCharacterDetails   │
          │  usePostCreatePostMutation│
          │  useDragAndDrop           │
          └─────────────┬─────────────┘
                        │
          ┌─────────────┴──────────────┐
          │       React Components     │
          │  App                       │
          │  ├── CustomSearch          │
          │  ├── CreatePost            │
          │  └── DragAndDrop           │
          │      ├── DroppableList     │
          │      │   └── SortableItem  │
          │      └── DroppableList     │
          │          └── SortableItem  │
          └────────────────────────────┘
```

All GraphQL operations (queries and mutations) are encapsulated in custom hooks under `src/hooks/`, keeping components clean and focused on rendering.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm v9 or later

### Installation

```bash
npm install
```

### Running the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Building for Production

```bash
npm run build
```

### Preview the Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## GraphQL API

This project uses the public [Rick and Morty GraphQL API](https://rickandmortyapi.com/graphql) — no API key is required.

| Hook | Operation | Description |
|---|---|---|
| `useGetCharacterList` | `query` | Fetches the first page of characters (`id`, `name`, `species`) |
| `useGetCharacterDetails` | `query` | Fetches a character's `image` and `name` by ID |
| `usePostCreatePostMutation` | `mutation` | Creates a post with `title` and `body` |

## Utility Functions

Located in `src/utils/`, these are standalone algorithm implementations:

| File | Description |
|---|---|
| `mergeSortedArray.ts` | Merges two sorted arrays into one sorted array |
| `removeDuplicateElements.ts` | Removes duplicate elements from an array |
| `majorityElement.ts` | Finds the element appearing more than ⌊n/2⌋ times |
| `rotateByK.ts` | Rotates an array by K positions |
| `lengthOfLastWord.ts` | Returns the length of the last word in a string |
| `firstOccuranceOfString.ts` | Finds the first occurrence of a substring |
