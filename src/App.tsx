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
      <div className="h-screen w-screen lg:min-h-full lg:w-full">
        <ResumePDF />
      </div>
    </div>
  );
}

export default App;
