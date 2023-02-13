import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Button, FormControl, IconButton, InputAdornment, Menu, MenuItem, Select, TextField } from '@mui/material';
import { ArrowDownward, ArrowUpward , PhotoCamera, Refresh, Search } from '@mui/icons-material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { callApi, getSearchQuery } from './../../utilities/utils';
import SizedBox from './../sizedBox/sizedBox';
import Loader from './../loader/loader';
import ErrorFetch from '../errorFetch/errorFetch';
import './customDataTable.css';


function CustomDataTable(props) {
    const options = props.options
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setError] = useState(false);
    const [rows, setRows] = useState(10)
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState(options.defaultSort ?? "");
    const [sortDir, setSortDir] = useState("desc");
    const [search, setSearch] = useState("");
    const [totalRows, setTotalRows] = useState(0)
    const [filter , setFilter] = useState("All")


    const colList = options.columns ?? []
    const searchableFields = options.searchFields ?? []
    const searchablePlaceholder = options.searchPlaceholder ?? "Search..."
    const mustKeys = options.mustKeys ?? []
    const title = options.title 
    const expandableRowsComponent = options.expandableRow



    const url = options.fetchUrl
    var query = options.query ?? {
        "size": rows,
        "from": 0,
        "query": {
            "bool": {}
        },
    }
    const specID = options.specID ?? ""
    var filters = options.filters ?? []
    var filterKey = options.filterKey ?? ""

    const type = options.type ?? "RECORD"


    async function fetchData(searchTxt, rowCount, pageNo, sortKey = "", direction = "desc" , filt = "All") {
        setError(false)
        setIsLoading(true)
        
        
            query['size'] = rowCount
            if (pageNo == 1) {
                query['from'] = 0
            } else {
                query['from'] = (pageNo - 1) * rowCount
            }
            if (searchTxt != "") {
                // Modify Query
                query["query"]['bool']['should'] = getSearchQuery(searchableFields , searchTxt)
    
                query["query"]['bool']['minimum_should_match'] = 1
            } else {
                delete query["query"]['bool']['minimum_should_match']
                delete query["query"]['bool']['should']
            }
    
            if (sortKey != "") {
                query['sort'] = {
                    [sortKey]: direction
                }
            }else{
                query['sort'] = {}
            }

            
    
            if(filt != "All") {
                query["query"]['bool']['must'] = mustKeys
                query["query"]['bool']['must'].push(
                    {
                        "match":{ [filterKey] : filt }
                    }
                )
            }else{
                query["query"]['bool']['must'] = mustKeys
            }

        var bodyObj = {
            "query": JSON.stringify(query),
            "type": type.toUpperCase(),
            "specId": specID.toString(),
        }
        if(!specID){
            delete bodyObj.specId 
        }
        const response = await callApi(url , bodyObj)
        if (response.status === false) {
            setError(true)
            return
        }
        var data = JSON.parse(response.result.result)
        setTotalRows(data.hits.total.value)
        setData(data.hits.hits);
        setIsLoading(false);
    }



    useEffect(() => {
        fetchData(search, rows, page, sort, sortDir , filter);
    }, []);


    const handleSort = async (column, sortDirection) => {

        if (Object.keys(column).length > 0) {
            setSort(column.sortField)
            setSortDir(sortDir === "asc" ? "desc" : "asc")
            fetchData(search, rows, page, column.sortField, sortDir === "asc" ? "desc" : "asc" , filter);
        }

    };


    function handleFilter(newE){
        setFilter(newE.target.value)
        fetchData(search, rows, page, sort, sortDir , newE.target.value);
    }






    return (
        <div className='data-table'>
            <div className='data-table-title'>{title}</div>
            <div className='data-table-options'>
                {filters.length > 0 ? 
                <FormControl style={{ minWidth : "150px" }} size="small">
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={filter}
                    startAdornment={<InputAdornment position='start' size="small">
                    <FilterAltOutlinedIcon style={{ fontSize : "20px"}}/>
                    </InputAdornment>}
                    onChange={handleFilter}
                >
                    <MenuItem value="All">
                        All
                    </MenuItem>
                    {filters.map((e)=>{
                        return <MenuItem key={e.value} value={e.value}>{e.name}</MenuItem>
                    })}
                </Select>
            </FormControl>
            : null}
                <SizedBox width="10px"></SizedBox>
                {searchableFields.length > 0 ?
                    <div className="data-table-search">
                        <TextField variant='outlined'
                            size="small"
                            placeholder= {searchablePlaceholder}
                            prefix="Test"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search fontSize='small'/>
                                    </InputAdornment>
                                ),
                                style:{
                                    fontSize:"15px",
                                    height:"35px"
                                }
                            }}
                            onChange={(e) => {
                                fetchData(e.target.value, rows, 1, sort, sortDir ,filter)
                                setPage(1)
                                setSearch(e.target.value)
                            }}
                        ></TextField>
                        <SizedBox width="10px"> </SizedBox>
                    </div>
                    : null
                }
                <Button variant="contained"  startIcon={<Refresh />} style={{ textTransform: "none", height: "35px"}} onClick={(e) => { fetchData(search, rows, page, sort, sortDir) }} >Refresh</Button>
            </div>
            <SizedBox height="20px"/>
            {isError ? (<ErrorFetch height="100px"></ErrorFetch>) :
                    (<DataTable
                        className='data-table-body'
                        pagination
                        fixedHeader
                        paginationServer
                        onChangeRowsPerPage={(currentRows, currentPage) => {
                            if (rows != currentRows) {
                                setRows(currentRows)
                                fetchData(search, currentRows, page, sort, sortDir , filter)
                            }
                        }}
                        onSort={handleSort}
                        progressPending={isLoading}
                        progressComponent={<Loader height="200px"/>}
                        paginationDefaultPage={page}
                        onChangePage={(pageNo, totalRows) => {
                            if (page != pageNo) {
                                setPage(pageNo)
                                fetchData(search, rows, pageNo, sort, sortDir,filter)
                            }
                        }}
                        sortServer
                        sortIcon={sortDir === "asc" ? <ArrowUpward /> : <ArrowDownward />}
                        paginationPerPage={rows}
                        paginationTotalRows={totalRows}
                        columns={colList}
                        data={data}
                        expandableRows = {expandableRowsComponent}
                        expandableRowsComponent={expandableRowsComponent}
                    />)}
        </div>
    );
}

export default CustomDataTable;