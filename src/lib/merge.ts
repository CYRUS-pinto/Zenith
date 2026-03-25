import { Roadmap, StudentProgress } from '@/types/sdg';

/**
 * Concatenates code from all completed modules into a single execution string.
 * This represents the "Final Merge" artifact for the Live Preview.
 */
export function mergeModuleCode(roadmap: Roadmap, progress: StudentProgress[]): string {
  let finalCode = `"""\nSustain-Ability AI: ${roadmap.courseTitle}\nSDG ${roadmap.primarySDG.id}: ${roadmap.primarySDG.name}\n"""\n\n`;

  roadmap.modules.forEach((mod) => {
    const modProgress = progress.find(p => p.moduleId === mod.id);
    if (modProgress && modProgress.status === 'COMPLETED' && modProgress.savedCode) {
      finalCode += `\n# --- ${mod.title} ---\n`;
      finalCode += modProgress.savedCode + "\n";
    } else {
      finalCode += `\n# --- ${mod.title} (NOT COMPLETED) ---\n`;
      finalCode += "# Module pending student logic...\n";
    }
  });

  return finalCode;
}
