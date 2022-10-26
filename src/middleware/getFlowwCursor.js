const getFlowwCursor = (cursorType) => {
    switch (cursorType) {
        case 'LaserPen':
            return "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAABgAAAAYADwa0LPAAABHklEQVRYw+3WPUrEUBAA4E9dsVcRf25h63ZWWgmCu42drdfQO3gCxcbG1iO4K6LiOURXUYhFNhiCWbLFywtLBoYQSPExM2/yaCNudHGDO5xiPhbkGD9IcnmFTt2QPr4LkCyv6wT9V5FinseuSD7fsRC7Ill+YakJkASXTYEMsRICUnVG8pDVmYZsYTQFZCBQaxbHzwPpqYgG6eEJm+P3fXyK0Jqevxl5zYH2SkCDOiBZTgIFbU3ZqSmCRiEhVRbaC9bH3+9iOQRkmj2Sr1BUSIIHDdmssw9Zw1sTIFmcNQVypFqLhqEhfdUuSMEhG6rNSnAIHE4APOOjLgjslEAG0tXerQsCc7gtQO4F+tmVAfLRwQm28YgL6S2ujTay+AX9yB2a9q/x1gAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMi0xMC0yNlQwNzoxNDowNiswMDowMBbAIc8AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjItMTAtMjZUMDc6MTQ6MDYrMDA6MDBnnZlzAAAAAElFTkSuQmCC') 0 35, crosshair";
        
        case 'EraserPen':
            return "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAABgAAAAYADwa0LPAAABVElEQVRYw+3Xuy4FQRwH4O9wEhqFaFwKCaVG79JKlN6ASiFRiHdQqam8gpCIB1ApJBqHREGUOjqJS7G7smdD7OzNKc4vmWKzO7Pf/mdnL/TTT1gGKx5vAOvYwhyu8fYfFzaMM3ym2j2mm4YM4TQDSdojZnoB0igoD6QRUAikVlARSC2gMpA0aLYsZBjnJSFJe8BoL0CSttcrkM94ur8zkBNyjJV4+wMXRcubyVWZirxjI76Io5JV6WAkLyS7aj6wmdrfwkFByB0mq4KUAdUCKQIKgrT9fI/8lTz3UAcTeSGwXQCSBxQMoXt6dkI7x6Dsq6IQBA5Tg9xgPLD/Il6rgBC9vNKDhYAqhSRZwIuwFVCkTy2gWiFJlnSX/RZTfxxTydTkBT1jF2vYF/0TNQL5DVTZc6Ro5kUr6yfICcaqOEkr4Ng2VrEs+lx8Ev1BXjZVkX56Il/kGjdleuianQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMi0xMC0yNlQwNzoyMDoxNiswMDowMEpj5yoAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjItMTAtMjZUMDc6MjA6MTYrMDA6MDA7Pl+WAAAAAElFTkSuQmCC') 0 35, crosshair";

        default:
            return "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAABgAAAAYADwa0LPAAABHklEQVRYw+3WPUrEUBAA4E9dsVcRf25h63ZWWgmCu42drdfQO3gCxcbG1iO4K6LiOURXUYhFNhiCWbLFywtLBoYQSPExM2/yaCNudHGDO5xiPhbkGD9IcnmFTt2QPr4LkCyv6wT9V5FinseuSD7fsRC7Ill+YakJkASXTYEMsRICUnVG8pDVmYZsYTQFZCBQaxbHzwPpqYgG6eEJm+P3fXyK0Jqevxl5zYH2SkCDOiBZTgIFbU3ZqSmCRiEhVRbaC9bH3+9iOQRkmj2Sr1BUSIIHDdmssw9Zw1sTIFmcNQVypFqLhqEhfdUuSMEhG6rNSnAIHE4APOOjLgjslEAG0tXerQsCc7gtQO4F+tmVAfLRwQm28YgL6S2ujTay+AX9yB2a9q/x1gAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMi0xMC0yNlQwNzoxNDowNiswMDowMBbAIc8AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjItMTAtMjZUMDc6MTQ6MDYrMDA6MDBnnZlzAAAAAElFTkSuQmCC') 0 35, crosshair";
    }
}

export default getFlowwCursor;