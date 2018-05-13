package com.ashish.expensify.service;

import com.ashish.expensify.service.dto.TransactionFunnelDTO;
import java.util.List;

/**
 * Service Interface for managing TransactionFunnel.
 */
public interface TransactionFunnelService {

    /**
     * Save a transactionFunnel.
     *
     * @param transactionFunnelDTO the entity to save
     * @return the persisted entity
     */
    TransactionFunnelDTO save(TransactionFunnelDTO transactionFunnelDTO);

    /**
     * Get all the transactionFunnels.
     *
     * @return the list of entities
     */
    List<TransactionFunnelDTO> findAll();

    /**
     * Get the "id" transactionFunnel.
     *
     * @param id the id of the entity
     * @return the entity
     */
    TransactionFunnelDTO findOne(Long id);

    /**
     * Delete the "id" transactionFunnel.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
