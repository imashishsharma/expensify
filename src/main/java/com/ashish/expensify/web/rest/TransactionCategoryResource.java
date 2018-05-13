package com.ashish.expensify.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ashish.expensify.service.TransactionCategoryService;
import com.ashish.expensify.web.rest.errors.BadRequestAlertException;
import com.ashish.expensify.web.rest.util.HeaderUtil;
import com.ashish.expensify.service.dto.TransactionCategoryDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing TransactionCategory.
 */
@RestController
@RequestMapping("/api")
public class TransactionCategoryResource {

    private final Logger log = LoggerFactory.getLogger(TransactionCategoryResource.class);

    private static final String ENTITY_NAME = "transactionCategory";

    private final TransactionCategoryService transactionCategoryService;

    public TransactionCategoryResource(TransactionCategoryService transactionCategoryService) {
        this.transactionCategoryService = transactionCategoryService;
    }

    /**
     * POST  /transaction-categories : Create a new transactionCategory.
     *
     * @param transactionCategoryDTO the transactionCategoryDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new transactionCategoryDTO, or with status 400 (Bad Request) if the transactionCategory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/transaction-categories")
    @Timed
    public ResponseEntity<TransactionCategoryDTO> createTransactionCategory(@Valid @RequestBody TransactionCategoryDTO transactionCategoryDTO) throws URISyntaxException {
        log.debug("REST request to save TransactionCategory : {}", transactionCategoryDTO);
        if (transactionCategoryDTO.getId() != null) {
            throw new BadRequestAlertException("A new transactionCategory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TransactionCategoryDTO result = transactionCategoryService.save(transactionCategoryDTO);
        return ResponseEntity.created(new URI("/api/transaction-categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /transaction-categories : Updates an existing transactionCategory.
     *
     * @param transactionCategoryDTO the transactionCategoryDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated transactionCategoryDTO,
     * or with status 400 (Bad Request) if the transactionCategoryDTO is not valid,
     * or with status 500 (Internal Server Error) if the transactionCategoryDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/transaction-categories")
    @Timed
    public ResponseEntity<TransactionCategoryDTO> updateTransactionCategory(@Valid @RequestBody TransactionCategoryDTO transactionCategoryDTO) throws URISyntaxException {
        log.debug("REST request to update TransactionCategory : {}", transactionCategoryDTO);
        if (transactionCategoryDTO.getId() == null) {
            return createTransactionCategory(transactionCategoryDTO);
        }
        TransactionCategoryDTO result = transactionCategoryService.save(transactionCategoryDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, transactionCategoryDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /transaction-categories : get all the transactionCategories.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of transactionCategories in body
     */
    @GetMapping("/transaction-categories")
    @Timed
    public List<TransactionCategoryDTO> getAllTransactionCategories() {
        log.debug("REST request to get all TransactionCategories");
        return transactionCategoryService.findAll();
        }

    /**
     * GET  /transaction-categories/:id : get the "id" transactionCategory.
     *
     * @param id the id of the transactionCategoryDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the transactionCategoryDTO, or with status 404 (Not Found)
     */
    @GetMapping("/transaction-categories/{id}")
    @Timed
    public ResponseEntity<TransactionCategoryDTO> getTransactionCategory(@PathVariable Long id) {
        log.debug("REST request to get TransactionCategory : {}", id);
        TransactionCategoryDTO transactionCategoryDTO = transactionCategoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(transactionCategoryDTO));
    }

    /**
     * DELETE  /transaction-categories/:id : delete the "id" transactionCategory.
     *
     * @param id the id of the transactionCategoryDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/transaction-categories/{id}")
    @Timed
    public ResponseEntity<Void> deleteTransactionCategory(@PathVariable Long id) {
        log.debug("REST request to delete TransactionCategory : {}", id);
        transactionCategoryService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
