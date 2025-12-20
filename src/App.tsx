import Menu from "./components/menu/menu";
import ResumeForm from "./components/resume-form/resume-form";
import ResumePDF from "./components/resume-pdf/resume-pdf";

function App() {
  return (
    <div className="min-h-full flex flex-col lg:flex-row gap-8 lg:p-2 lg:gap-2">
      <div className="w-full flex flex-col gap-2">
        <ResumeForm />
        <div className="p-2">
          <Menu />
        </div>
      </div>
      <ResumePDF />
    </div>
  );
}

export default App;
