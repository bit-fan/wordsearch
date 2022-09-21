import React, { useEffect, useState } from 'react';

const LINEHEIGHT = 26;
const searchNext = (matrix, curI, curJ, toI, toJ, lookFor) => {
    try {
        const result = matrix[curI][curJ] === lookFor[0];
        // console.log('result', matrix[curI + toI][curJ + toJ], lookFor[0]);
        if (!result) {
            return 0;
        }
        if (lookFor.length > 1) {
            return searchNext(matrix, curI + toI, curJ + toJ, toI, toJ, lookFor.slice(1));
        }
        console.log('good');
        return { endI: curI, endJ: curJ, toI, toJ };
    } catch (e) {
        return 0;
    }
}
export const Matrix = ({ data, searchWord }) => {
    const [parsedData, setParsedData] = useState([[]]);
    const [highlight, setHighlight] = useState({});
    useEffect(() => {
        console.log(data);
        const parseD = (data || '').split('\n').map(each => { return each });
        console.log('parseD', parseD);
        setParsedData(parseD);
    }, [data]);
    useEffect(() => {
        const newObj = {};
        console.log('parsedData', parsedData);
        for (let i = 0; i < parsedData.length; i++) {
            for (let j = 0; j < parsedData[i].length; j++) {
                console.log('here', parsedData[i][j], searchWord);
                const result = searchNext(parsedData, i, j, -1, -1, searchWord) ||
                    searchNext(parsedData, i, j, -1, 0, searchWord) ||
                    searchNext(parsedData, i, j, -1, 1, searchWord) ||
                    searchNext(parsedData, i, j, 0, -1, searchWord) ||
                    searchNext(parsedData, i, j, 0, 1, searchWord) ||
                    searchNext(parsedData, i, j, 1, -1, searchWord) ||
                    searchNext(parsedData, i, j, 1, 0, searchWord) ||
                    searchNext(parsedData, i, j, 1, 1, searchWord);
                if (result !== 0) {
                    // newObj[`${i}#${j}`] = true;
                    console.log('result', result);
                    let p = i, q = j;
                    newObj[`${p}#${q}`] = true;
                    while (p !== result.endI || q !== result.endJ) {
                        p += result.toI;
                        q += result.toJ;
                        newObj[`${p}#${q}`] = true;
                    }
                }
            }
        }
        console.log('hight', newObj);
        setHighlight(newObj);
    }, [searchWord]);
    const Row = ({ rowNum, data }) => {
        return <div style={{
            height: `${LINEHEIGHT + 8}px`,
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            justifyContent: 'center'
        }}>
            {
                Array.prototype.map.call(data, (col, idx) => {
                    const bgColor = highlight[`${rowNum}#${idx}`] ? "grey" : 'white';
                    return <div style={{
                        flex: `0 1 ${LINEHEIGHT}px`,
                        background: bgColor,
                        border: "double 1px purple",
                        borderRadius: "3px",
                        // lineHeight: '8px',
                        fontSize: '20px'
                    }} key={`${col}${idx}`}><span> {col}</span></div>
                })
            }
        </div>
    }
    return <>
        <h3>Matrix</h3>
        <div style={{ border: "double 1px purple" }}>
            {parsedData.map((row, idx) => {
                return <div><Row rowNum={idx} data={row} key={`${row}${idx}`} /></div>
            })}
        </div>
    </>
}