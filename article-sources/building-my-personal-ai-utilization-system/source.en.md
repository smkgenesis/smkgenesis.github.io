Building My Personal AI Utilization System

A practical architecture for using AI tools in research, learning, and software development.

Motivation

AI tools are powerful, but using them independently often leads to messy workflows.

A typical workflow might look like this:

Ask ChatGPT -> open Perplexity -> upload to NotebookLM -> copy results to Drive -> repeat

Over time, several problems appear:

context becomes fragmented

knowledge spreads across multiple tools

switching between AIs creates friction

long-term work lacks a persistent structure

The limitation is not the capability of AI models.

The real problem is the lack of a clear architecture for using them together.

Goal

The goal of this project is simple:

Design a system where multiple AI tools cooperate instead of being used independently.

The system should support:

studying university courses

managing research materials

writing long documents

building software projects

organizing knowledge over time

The focus is practical workflow, not theoretical design.

Key Idea

Instead of relying on a single AI tool for everything, the system assigns specific roles to different tools.

Example role distribution:

Search       -> Perplexity
Store        -> Zotero
Analyze      -> NotebookLM
Organize     -> Gemini
Design       -> Claude
Build        -> ChatGPT / Codex
Code State   -> GitHub
Memory       -> Google Drive
Control      -> gws CLI

Each tool is used for what it does best.

The result is a simple but structured AI working environment.

Philosophy

The system follows three basic principles.

1. AI assists thinking - it does not replace it

Human judgment remains central.

2. AI is a cognitive tool

AI extends research, coding, and learning workflows.

3. Working systems > perfect systems

A simple system that works consistently is better than a perfect design that is never used.

Architecture Overview

The system is centered around Google Drive as a shared knowledge and memory layer.

The main operational interface to this layer is Gemini CLI, which interacts with Google Drive through gws.

The architecture follows a simple pattern:

Inputs -> Gemini CLI -> Google Drive -> AI tools -> Outputs
                                   -> GitHub (code state)

Raw materials enter the system, Gemini organizes them, AI tools consume the organized state, and the resulting outputs are written back into the system.

Architecture Diagram

INPUTS
- LearnUS files
- Research papers
- Notes
- Manuals
- Course PDFs
- Project docs
- Drafts
- Outputs

Gemini CLI + gws integration
- file classification
- renaming
- folder routing
- context updates
- schedule extraction

Google Drive Shared Memory Layer
- University/
- Projects/
- Librarian/
- librarian_memory/

Knowledge Tools
- NotebookLM
- Perplexity
- Zotero (manual)

Execution Tools
- Claude
- ChatGPT / Codex
- Claude Code

Outputs
- Research & Analysis
- Design & Implementation

Core Architectural Principle

The system separates two types of state.

Knowledge State

Stored in Google Drive

Includes:
- course materials
- research summaries
- documentation
- project notes
- shared AI context

Code State

Stored in GitHub

Includes:
- source code
- version history
- software projects

This separation keeps research workflows and development workflows clean.