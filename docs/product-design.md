# PerformanceOS Product Design Notes

## Purpose

PerformanceOS is not a task manager.

PerformanceOS is a system for tracking meaningful performance metrics and long-term initiatives in order to evaluate consistency, execution, and progress over time.

The objective is not perfection.

The objective is accurate visibility into commitments and outcomes.

---

# Core Principles

## History Is Never Rewritten

Targets may change.

History may not.

When evaluating past performance, the system should preserve the target that existed at the time the performance was recorded.

Historical scores should never be recalculated because a target changed later.

---

## Data Should Be Easy To Correct

Entries should be editable.

Mistakes happen.

Users should be able to update inaccurate data.

---

## Data Should Be Hard To Destroy

Deletion should be uncommon.

Entries may be deleted with confirmation.

Goals should generally be completed or archived rather than deleted.

Historical information should be preserved whenever possible.

---

# Canonical Metrics

Canonical metrics are metrics that the application understands.

The application defines:

- Name
- Unit
- Scoring behavior
- Cadence
- Default targets

Initial metric candidates:

- Sleep
- Protein
- Steps
- Training Adherence
- Energy
- Focus

Future candidates:

- Recovery
- Hydration
- Bodyweight Trend

---

# Metric Categories

## Accumulation Metrics

Examples:

- Sleep
- Protein
- Steps

Rule:

Meeting the target achieves full score.

Exceeding the target should generally not be penalized.

Scores cap at 100%.

---

## Rating Metrics

Examples:

- Energy
- Focus

Typically recorded on a 1-10 scale.

---

## Adherence Metrics

Examples:

- Training Adherence

The purpose is measuring execution against a planned commitment.

---

# User Goals

Goals are not tasks.

Goals represent long-term initiatives.

Examples:

- PerformanceOS
- Career Transition
- Spanish
- Write Book
- Launch Product

Non-examples:

- Fix bug
- Buy groceries
- Schedule appointment

Goals should generally exist for weeks or months.

---

# Goal Lifecycle

Goals should move through states.

States:

- Active
- Completed
- Archived

Deletion should be rare.

Completion and archival are preferred over deletion.

---

# Goal Targets

Goals use weekly commitments.

Examples:

- 5 hours per week
- 10 hours per week
- 20 pages per week
- 1 chapter per week

Goals are not primarily evaluated on daily targets.

Daily tracking may exist for convenience.

Weekly commitment is the primary measurement.

---

# Weekly Target Rules

Current week is locked.

Future weeks are editable.

A target change should take effect on the next week rather than the current week.

This preserves consistency and prevents historical distortion.

Example:

Week 1:
Target = 5 hours

Week 2:
Target = 8 hours

Week 1 remains evaluated against 5 hours.

---

# Target History

Target changes should be recorded.

The system should preserve:

- Previous target
- New target
- Effective week

The purpose is visibility rather than punishment.

Users are accountable to themselves.

The system records commitments and changes to those commitments.

---

# Accountability Philosophy

The application does not create accountability.

The application creates visibility.

The purpose is to accurately record:

- Commitments
- Target changes
- Execution
- Outcomes

Users can then evaluate their own consistency and progress over time.

---

# Future Considerations

Potential future rollups:

- Recovery
- Execution
- Wellbeing

These categories may aggregate multiple metrics into higher-level performance scores.

Not required for initial implementation.