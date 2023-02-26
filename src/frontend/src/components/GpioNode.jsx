import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import { Box, Typography } from "@mui/material";

const GpioNode = ({ data, isConnectable }) => {
    const outputs = data.outputs || 8;
    const inputs = data.inputs || 8;
    const name = data.name || "GPIO Box";

    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);

    const getOutputs = () => {
        const handles = [];

        for (let output = 1; output <= outputs; output++) {
            handles.push(
                <Box>
                    <Handle
                        type="source"
                        position={Position.Right}
                        id={output}
                        key={output}
                        style={{ top: `${output * 1}em` }}
                        isConnectable={isConnectable}
                    />

                    <Typography
                        variant="subtitle1"
                        style={{
                            position: "absolute",
                            right: "1em",
                            top: `${-0.9 + output * 1.73}em`,
                            fontSize: "0.58em",
                        }}
                    >
                        {output}
                    </Typography>
                </Box>
            );
        }
        return handles;
    };

    const getInputs = () => {
        const handles = [];

        for (let input = 1; input <= inputs; input++) {
            handles.push(
                <Box style={{ top: 0 }}>
                    <Handle
                        type="target"
                        position={Position.Left}
                        id={input}
                        key={input}
                        style={{ top: `${input * 1}em` }}
                        isConnectable={isConnectable}
                    />
                    <Typography
                        variant="subtitle1"
                        style={{
                            position: "absolute",
                            left: "1em",
                            top: `${-0.9 + input * 1.73}em`,
                            fontSize: "0.58em",
                        }}
                    >
                        {input}
                    </Typography>
                </Box>
            );
        }
        return handles;
    };

    return (
        <Box
            style={{
                height: `${inputs > outputs ? inputs + 1 : outputs + 1}em`,
                border: "0px solid #eee",
                padding: "5px",
                borderRadius: "3px",
                background: "rgba(91, 91, 91, 0.868)",
            }}
        >
            <Box>{getInputs()}</Box>
            <Box>{getOutputs()}</Box>

            <Box style={{ paddingLeft: "1em", paddingRight: "1em" }}>
                <Typography variant="subtitle2">{name}</Typography>
            </Box>
        </Box>
    );
};

export default GpioNode;
