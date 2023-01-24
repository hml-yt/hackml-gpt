const boxClassification = {
  fieldset: "sm:items-baseline sm:gap-4",
  legend: "contents text-base font-medium text-gray-900",
  wrapper: "flex items-center cursor-pointer",
  help: "text-sm text-gray-500",
  inner: "$reset mr-3",
  input:
    "$reset block w-full appearance-none rounded-md border border-gray-300 px-2 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm",
  label: "block text-sm text-gray-900",
};
const buttonClassification = {
  wrapper: "mb-1",
  input:
    "flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
};

// export our definitions using our above
// templates and declare one-offs and
// overrides as needed.
export default {
  // the global key will apply to all inputs
  global: {
    outer: "formkit-disabled:opacity-50 mb-5",
    label: "contents text-base font-medium text-gray-900",
    inner: "mt-1",
    input:
      "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm",
    help: "mt-2 text-sm text-gray-500",
    messages: "list-none p-0 mt-1 mb-0",
    message: "text-red-500 mb-1 text-xs",
  },
  form: {
    outer: "mx-auto max-w-7xl sm:px-6 lg:px-8 py-10",
  },
  color: {
    label: "block text-sm font-medium text-gray-700",
    input:
      "$reset w-16 h-8 appearance-none cursor-pointer border border-gray-300 rounded-md p-1",
  },
  checkbox: {
    ...boxClassification,
    input:
      "$reset block w-full appearance-none rounded-md border border-gray-300 px-2 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm",
  },
  radio: {
    ...boxClassification,
    input:
      "$reset h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500",
  },
  file: {
    inner: "max-w-md cursor-pointer",
    input:
      "$reset text-gray-600 text-sm mb-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-500 file:text-white hover:file:bg-blue-600",
    noFiles: "block text-gray-800 text-sm mb-1",
    fileItem: "block flex text-gray-800 text-sm mb-1",
    fileRemove: "ml-auto text-blue-500 text-sm",
  },
  range: {
    inner: "max-w-md",
    input:
      "$reset form-range appearance-none w-full h-2 p-0 bg-gray-200 rounded-full focus:outline-none focus:ring-0 focus:shadow-none",
  },
  submit: buttonClassification,
  button: buttonClassification,
};
