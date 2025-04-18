import axios from "axios";
import { ReactSketchCanvasRef } from "react-sketch-canvas"
import { toast } from "sonner";

interface propsType {
    // imagePath: string | undefined,
    prompt: string,
    canvasRef: React.RefObject<ReactSketchCanvasRef | null>,
    setResult: (res: object) => void

}


const handleSubmitForm = async ({ prompt, canvasRef, setResult }: propsType) => {

    if (!canvasRef.current) return;
    const imagePath = await canvasRef.current?.exportImage("png");

    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/analyze`, {
        imagePath: imagePath,
        context: prompt
    }, { withCredentials: true })

    if (response.status === 200) {
        toast.success("Analyzed Successfully")
    }
    else {
        toast.error("Failed to analyze")
    }

    setResult(response.data.data.result)
    // console.log(response.data.data.result)
    console.log("Form created successfully")

    // console.log(imagePath)
    // console.log(prompt)

}


export default handleSubmitForm