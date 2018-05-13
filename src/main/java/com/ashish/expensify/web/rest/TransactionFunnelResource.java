package com.ashish.expensify.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ashish.expensify.service.TransactionFunnelService;
import com.ashish.expensify.web.rest.errors.BadRequestAlertException;
import com.ashish.expensify.web.rest.util.HeaderUtil;
import com.ashish.expensify.service.dto.TransactionFunnelDTO;
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
 * REST controller for managing TransactionFunnel.
 */
@RestController
@RequestMapping("/api")
public class TransactionFunnelResource {

    private final Logger log = LoggerFactory.getLogger(TransactionFunnelResource.class);

    private static final String ENTITY_NAME = "transactionFunnel";

    private final TransactionFunnelService transactionFunnelService;

    public TransactionFunnelResource(TransactionFunnelService transactionFunnelService) {
        this.transactionFunnelService = transactionFunnelService;
    }

    /**
     * POST  /transaction-funnels : Create a new transactionFunnel.
     *
     * @param transactionFunnelDTO the transactionFunnelDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new transactionFunnelDTO, or with status 400 (Bad Request) if the transactionFunnel has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/transaction-funnels")
    @Timed
    public ResponseEntity<TransactionFunnelDTO> createTransactionFunnel(@Valid @RequestBody TransactionFunnelDTO transactionFunnelDTO) throws URISyntaxException {
        log.debug("REST request to save TransactionFunnel : {}", transactionFunnelDTO);
        if (transactionFunnelDTO.getId() != null) {
            throw new BadRequestAlertException("A new transactionFunnel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TransactionFunnelDTO result = transactionFunnelService.save(transactionFunnelDTO);
        return ResponseEntity.created(new URI("/api/transaction-funnels/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /transaction-funnels : Updates an existing transactionFunnel.
     *
     * @param transactionFunnelDTO the transactionFunnelDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated transactionFunnelDTO,
     * or with status 400 (Bad Request) if the transactionFunnelDTO is not valid,
     * or with status 500 (Internal Server Error) if the transactionFunnelDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/transaction-funnels")
    @Timed
    public ResponseEntity<TransactionFunnelDTO> updateTransactionFunnel(@Valid @RequestBody TransactionFunnelDTO transactionFunnelDTO) throws URISyntaxException {
        log.debug("REST request to update TransactionFunnel : {}", transactionFunnelDTO);
        if (transactionFunnelDTO.getId() == null) {
            return createTransactionFunnel(transactionFunnelDTO);
        }
        TransactionFunnelDTO result = transactionFunnelService.save(transactionFunnelDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, transactionFunnelDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /transaction-funnels : get all the transactionFunnels.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of transactionFunnels in body
     */
    @GetMapping("/transaction-funnels")
    @Timed
    public List<TransactionFunnelDTO> getAllTransactionFunnels() {
        log.debug("REST request to get all TransactionFunnels");
        return transactionFunnelService.findAll();
        }

    /**
     * GET  /transaction-funnels/:id : get the "id" transactionFunnel.
     *
     * @param id the id of the transactionFunnelDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the transactionFunnelDTO, or with status 404 (Not Found)
     */
    @GetMapping("/transaction-funnels/{id}")
    @Timed
    public ResponseEntity<TransactionFunnelDTO> getTransactionFunnel(@PathVariable Long id) {
        log.debug("REST request to get TransactionFunnel : {}", id);
        TransactionFunnelDTO transactionFunnelDTO = transactionFunnelService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(transactionFunnelDTO));
    }

    /**
     * DELETE  /transaction-funnels/:id : delete the "id" transactionFunnel.
     *
     * @param id the id of the transactionFunnelDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/transaction-funnels/{id}")
    @Timed
    public ResponseEntity<Void> deleteTransactionFunnel(@PathVariable Long id) {
        log.debug("REST request to delete TransactionFunnel : {}", id);
        transactionFunnelService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
