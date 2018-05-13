package com.ashish.expensify.service;

import com.ashish.expensify.service.dto.TransactionCategoryDTO;
import java.util.List;

/**
 * Service Interface for managing TransactionCategory.
 */
public interface TransactionCategoryService {

    /**
     * Save a transactionCategory.
     *
     * @param transactionCategoryDTO the entity to save
     * @return the persisted entity
     */
    TransactionCategoryDTO save(TransactionCategoryDTO transactionCategoryDTO);

    /**
     * Get all the transactionCategories.
     *
     * @return the list of entities
     */
    List<TransactionCategoryDTO> findAll();

    /**
     * Get the "id" transactionCategory.
     *
     * @param id the id of the entity
     * @return the entity
     */
    TransactionCategoryDTO findOne(Long id);

    /**
     * Delete the "id" transactionCategory.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
