import { fabric } from "floww-whiteboard";

const getFlowwBrushObject = (brushName, whiteboardObject) => {
    if (whiteboardObject) whiteboardObject.flowwBrushIdentifier = brushName;
    switch (brushName) {
        case 'PencilBrush': {
            return new fabric.PencilBrush(whiteboardObject);
        }

        case 'EraserBrush': {
            return new fabric.EraserBrush(whiteboardObject);
        }

        case 'CircleBrush': {
            return new fabric.CircleBrush(whiteboardObject);
        }

        case 'SprayBrush': {
            return new fabric.SprayBrush(whiteboardObject);
        }

        default: {
            return new fabric.PencilBrush(whiteboardObject);
        }
    }
}

export default getFlowwBrushObject;