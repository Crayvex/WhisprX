import React from "react";
import { DAISYUI_THEMES, useThemeStore } from "../../../Store/useThemeStore";
import { Check } from 'lucide-react'

const ThemePreview = ({ name, isActive, onSelect }) => (
  <button
    type="button"
    data-theme={name}
    onClick={() => onSelect(name)}
    className={`group relative w-full cursor-pointer overflow-hidden rounded-box border-2 bg-base-100 text-left transition-all hover:scale-[1.02] ${
      isActive
        ? "border-primary ring-2 ring-primary/30"
        : "border-base-300 hover:border-primary/50"
    }`}
    aria-pressed={isActive}
    aria-label={`Select ${name} theme`}
  >
    <div className="flex h-16">
      <div className="flex-1 bg-primary" />
      <div className="flex-1 bg-secondary" />
      <div className="flex-1 bg-accent" />
      <div className="flex-1 bg-neutral" />
    </div>
    <div className="flex items-center justify-between px-3 py-2">
      <span className="text-sm font-medium capitalize text-base-content">
        {name}
      </span>
      {isActive && <Check className="size-4 text-primary" aria-hidden="true" />}
    </div>
  </button>
);

const Preferences = () => {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  return (
    <div className="h-full w-full bg-base-200 text-base-content">
      <div className="mx-auto p-4 max-w-full h-full overflow-y-scroll">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-base-content">
              Preferences
            </h1>
            <p className="mt-1 text-base-content/70">
              Customize your WhisprX experience
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body gap-6">
            <div>
              <h2 className="card-title">Theme</h2>
              <p className="text-sm text-base-content/70">
                Choose a DaisyUI theme. Your selection is saved automatically.
              </p>
            </div>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Current theme</span>
              </div>
              <select
                className="select select-bordered outline-0 capitalize"
                value={theme}
                onChange={(event) => setTheme(event.target.value)}
              >
                {DAISYUI_THEMES.map((themeName) => (
                  <option
                    key={themeName}
                    value={themeName}
                    className="capitalize"
                  >
                    {themeName}
                  </option>
                ))}
              </select>
            </label>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {DAISYUI_THEMES.map((themeName) => (
                <ThemePreview
                  key={themeName}
                  name={themeName}
                  isActive={theme === themeName}
                  onSelect={setTheme}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
