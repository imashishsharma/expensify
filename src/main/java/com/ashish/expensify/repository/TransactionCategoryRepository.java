package com.ashish.expensify.repository;

import com.ashish.expensify.domain.TransactionCategory;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TransactionCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransactionCategoryRepository extends JpaRepository<TransactionCategory, Long> {

}
